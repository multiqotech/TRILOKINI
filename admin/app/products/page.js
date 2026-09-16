"use client";
import { useState, useEffect } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct, getCategories } from "../../api";
import { resolveImage } from "../../utils";
import DataTable from "../../components/DataTable";
import FormModal from "../../components/FormModal";
import { PageToolbar, StatusBadge, EmptyThumb } from "../../components/ui";
import { Plus } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([getProducts(), getCategories()]);
      setProducts(prodRes.data || []);
      setCategories(catRes.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try { await deleteProduct(id); fetchData(); } catch (error) { console.error(error); }
    }
  };

  const handleSubmit = async (data) => {
    const payload = { ...data };
    if (typeof payload.sizes === "string" && payload.sizes) {
      payload.sizes = payload.sizes.split(",").map((s) => s.trim()).filter(Boolean);
    }
    if (typeof payload.bottomSizes === "string" && payload.bottomSizes) {
      payload.bottomSizes = payload.bottomSizes.split(",").map((s) => s.trim()).filter(Boolean);
    }

    const toNumber = (value) => (value === "" || value === undefined || value === null ? undefined : Number(value));
    payload.currentPrice = toNumber(payload.currentPrice);
    payload.previousPrice = toNumber(payload.previousPrice);
    payload.discountPercentage = toNumber(payload.discountPercentage);

    if (
      payload.previousPrice &&
      payload.currentPrice &&
      payload.previousPrice > payload.currentPrice &&
      (payload.discountPercentage === undefined || payload.discountPercentage === null)
    ) {
      payload.discountPercentage = Math.round(
        ((payload.previousPrice - payload.currentPrice) / payload.previousPrice) * 100
      );
    }

    if (Array.isArray(payload.variants) && payload.variants.length > 0) {
      const primary = { ...payload.variants[0] };
      if (payload.currentPrice != null) primary.currentPrice = payload.currentPrice;
      if (payload.previousPrice != null) primary.previousPrice = payload.previousPrice;
      if (payload.discountPercentage != null) primary.discountPercentage = payload.discountPercentage;
      if (payload.imageUrl) {
        const images = Array.isArray(primary.images) ? primary.images.filter(Boolean) : [];
        primary.images = [payload.imageUrl, ...images.filter((url) => url !== payload.imageUrl)];
      }
      payload.variants = [primary, ...payload.variants.slice(1)];
    }

    if (editingProduct) await updateProduct(editingProduct._id, payload);
    else await createProduct(payload);
    setIsModalOpen(false);
    fetchData();
  };

  const filteredProducts = selectedCategoryFilter
    ? products.filter((p) => p.category?._id === selectedCategoryFilter || p.category === selectedCategoryFilter)
    : products;

  const columns = [
    {
      key: "imageUrl",
      label: "Image",
      render: (val, row) => {
        const img = val || row.variants?.[0]?.images?.[0];
        return img ? <img src={resolveImage(img)} alt="" className="h-12 w-12 rounded-lg object-cover object-top" /> : <EmptyThumb />;
      },
    },
    { key: "title", label: "Title", render: (val, row) => <div><p className="font-medium text-white">{val}</p><p className="text-xs" style={{ color: "var(--text-muted)" }}>{row.category?.title}</p></div> },
    { key: "designerName", label: "Designer", render: (val) => val || "—" },
    { key: "currentPrice", label: "Current", render: (val) => val != null ? `₹${Number(val).toLocaleString("en-IN")}` : "—" },
    { key: "previousPrice", label: "Previous", render: (val) => val != null ? `₹${Number(val).toLocaleString("en-IN")}` : "—" },
    { key: "discountPercentage", label: "Discount", render: (val) => val ? `${val}%` : "—" },
    { key: "showInHomePage", label: "Homepage", render: (val) => <StatusBadge value={val} /> },
  ];

  const formFields = [
    { name: "category", label: "Category", type: "select", options: categories.map((c) => ({ label: c.title, value: c._id })), required: true },
    { name: "title", label: "Title", type: "text", required: true },
    { name: "imageUrl", label: "Main image", type: "image", aspectRatio: 336 / 505 },
    { name: "currentPrice", label: "Current price (₹)", type: "number", required: true },
    { name: "previousPrice", label: "Previous price (₹)", type: "number" },
    { name: "discountPercentage", label: "Discount (%)", type: "number" },
    { name: "subtitle", label: "Subtitle", type: "text" },
    { name: "designerName", label: "Designer name", type: "text" },
    { name: "productCode", label: "Product code", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "shippingInfo", label: "Shipping information", type: "textarea" },
    { name: "disclaimer", label: "Disclaimer", type: "textarea" },
    { name: "supplierInfo", label: "Supplier information", type: "textarea" },
    { name: "tags", label: "Tags", type: "tags", placeholder: "trending, new" },
    { name: "variants", label: "Color variants & pricing", type: "variants" },
    { name: "sizes", label: "Sizes", type: "text", placeholder: "XS, S, M, L, XL" },
    { name: "bottomSizes", label: "Bottom sizes", type: "text" },
    { name: "addons", label: "Add-ons", type: "addons" },
    { name: "customTailoringEnabled", label: "Custom tailoring enabled", type: "toggle" },
    { name: "customTailoringPrice", label: "Custom tailoring price (₹)", type: "number" },
    { name: "showInHomePage", label: "Show on homepage", type: "toggle" },
    { name: "homePageOrder", label: "Homepage order", type: "number" },
  ];

  return (
    <div className="space-y-6">
      <PageToolbar title="Products" description="Catalog, pricing, sizes and add-ons.">
        <select value={selectedCategoryFilter} onChange={(e) => setSelectedCategoryFilter(e.target.value)} className="admin-input sm:w-52">
          <option value="">All categories</option>
          {categories.map((c) => <option key={c._id} value={c._id}>{c.title}</option>)}
        </select>
        <button onClick={() => handleOpenModal()} className="admin-btn-primary"><Plus size={18} /> Add product</button>
      </PageToolbar>

      <DataTable columns={columns} data={filteredProducts} onEdit={handleOpenModal} onDelete={handleDelete} />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? "Edit product" : "Add product"}
        fields={formFields}
        initialData={editingProduct ? {
          ...editingProduct,
          category: editingProduct.category?._id || editingProduct.category,
          imageUrl: editingProduct.imageUrl || editingProduct.variants?.[0]?.images?.[0] || "",
          currentPrice: editingProduct.currentPrice ?? editingProduct.variants?.[0]?.currentPrice ?? "",
          previousPrice: editingProduct.previousPrice ?? editingProduct.variants?.[0]?.previousPrice ?? "",
          discountPercentage: editingProduct.discountPercentage ?? editingProduct.variants?.[0]?.discountPercentage ?? "",
          sizes: Array.isArray(editingProduct.sizes) ? editingProduct.sizes.join(", ") : editingProduct.sizes,
          bottomSizes: Array.isArray(editingProduct.bottomSizes) ? editingProduct.bottomSizes.join(", ") : editingProduct.bottomSizes,
        } : { customTailoringEnabled: true, addons: [] }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
