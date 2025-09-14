// app/blog/[id]/page.tsx
import BlogDetailPage from "./_components/BlogDetailPage";

interface PageProps {
    params: Promise<{ id: string }>; // chú ý Promise
}

export default async function Page({ params }: PageProps) {
    const { id } = await params; // chờ resolve params
    return <BlogDetailPage blogId={parseInt(id)} />;
}
