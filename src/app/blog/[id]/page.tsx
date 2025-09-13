// app/blog/[id]/page.tsx
import BlogDetailPage from "../_components/BlogDetailPage";


export default function Page({ params }: { params: { id: string } }) {
    return <BlogDetailPage id={params.id} />;
}
