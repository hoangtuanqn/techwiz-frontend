// app/gallery/[cat]/page.tsx
import GalleryDetailPage from "../_components/GalleryDetailPage";

/** 👇 Nếu bạn dùng `next build` với `output: "export"`,
 *  cần prebuild các đường dẫn động bằng generateStaticParams.
 *  Nếu bạn không dùng export tĩnh thì vẫn để cũng không sao.
 */
export const dynamicParams = false; // chỉ cho phép các cat trong danh sách bên dưới

export function generateStaticParams() {
    // PHẢI trùng với key trong GalleryPage.tsx và GalleryDetailPage.tsx
    return ["technical", "business", "cultural", "sports", "workshop", "academic", "annual", "community", "other"].map(
        (cat) => ({ cat }),
    );
}

export default function Page({ params }: { params: { cat: string } }) {
    return <GalleryDetailPage cat={params.cat} />;
}
