import Image from "next/image";

export function SectionHeading({ title, action = "VIEW ALL", href = "#" }: { title: string; action?: string; href?: string }) {
  return <div className="flex items-end justify-between border-b border-transparent px-[5px] lg:px-6"><h2 className="text-[14px] font-medium leading-[18px] tracking-[0.42px] lg:text-[24px] lg:leading-[30px] lg:tracking-[0.72px]">{title}</h2><a href={href} className="text-[12px] font-medium tracking-[0.36px] text-gray lg:text-[14px] lg:tracking-[0.42px]">{action}</a></div>;
}

type TileProps = { src: string; title?: string; subtitle?: string; href?: string; className?: string };

function ImageTile({ src, title, subtitle, href = "#", className = "" }: TileProps) {
  return <a href={href} className={`group relative block overflow-hidden bg-gray-light ${className}`}><Image src={src} alt={title ?? ""} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" /><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-4 pt-12 text-white"><strong className="block text-[13px] font-semibold tracking-[0.65px]">{title}</strong>{subtitle ? <span className="mt-1 block text-[12px] tracking-[0.36px]">{subtitle}</span> : null}</span></a>;
}

export function EditorialTile(props: TileProps) { return <ImageTile {...props} />; }
export function DesignerTile(props: TileProps) { return <ImageTile {...props} />; }
export function CelebrityTile(props: TileProps) { return <ImageTile {...props} />; }
export function WeddingTile(props: TileProps) { return <ImageTile {...props} />; }

export function EditorialSection({ title, items }: { title: string; items: TileProps[] }) {
  return <section className="space-y-5"><SectionHeading title={title} /><div className="grid grid-cols-2 gap-2 px-page lg:grid-cols-4 lg:gap-5">{items.map((item) => <EditorialTile key={`${item.title}-${item.src}`} {...item} className="aspect-[192/288]" />)}</div></section>;
}

export function ProductSection({ title, items }: { title: string; items: { src: string; designer: string; name: string; price: string; originalPrice?: string; discount?: string }[] }) {
  return <section className="space-y-5"><SectionHeading title={title} /><div className="grid grid-cols-2 gap-4 px-page lg:grid-cols-5">{items.map((item) => <div key={`${item.designer}-${item.name}`}><div className="relative aspect-[244/366] bg-gray-light"><Image src={item.src} alt={item.name} fill className="object-cover" /></div><div className="pt-3 text-[12px] tracking-[0.36px]"><p className="font-medium text-black">{item.designer}</p><p className="mt-1 text-gray">{item.name}</p><p className="mt-2">{item.price} {item.originalPrice ? <del className="text-gray">{item.originalPrice}</del> : null} {item.discount ? <span className="text-sale">{item.discount}</span> : null}</p></div></div>)}</div></section>;
}
