"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function TestBlogApiPage() {
    const [loading, setLoading] = useState(false);
    const [schema, setSchema] = useState<any>(null);

    async function testSchema() {
        try {
            setLoading(true);
            const response = await fetch('/api/v1/test-blog/schema');
            const data = await response.json();
            setSchema(data);
            toast.success('Schema loaded successfully');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to load schema');
        } finally {
            setLoading(false);
        }
    }

    async function testValidation() {
        try {
            setLoading(true);
            const response = await fetch('/api/v1/test-blog/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: 'Test Blog Title',
                    slug: 'test-blog-slug',
                    content: 'This is test content',
                    category: 'technology',
                }),
            });
            const data = await response.json();
            toast.success('Validation test passed');
            console.log('Validation result:', data);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Validation test failed');
        } finally {
            setLoading(false);
        }
    }

    async function testCreateMinimal() {
        try {
            setLoading(true);
            const response = await fetch('/api/v1/test-blog/create-minimal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Minimal blog created successfully');
                console.log('Created blog:', data.blog);
            } else {
                toast.error('Failed to create minimal blog: ' + data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to create minimal blog');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-white py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-8">
                    Test Blog API & Database Schema
                </h1>
                
                <div className="space-y-6">
                    <div className="border border-slate-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Database Schema Test</h2>
                        <button
                            onClick={testSchema}
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Loading...' : 'Check Database Schema'}
                        </button>
                        
                        {schema && (
                            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                                <h3 className="font-semibold mb-2">Schema Information:</h3>
                                <div className="space-y-2 text-sm">
                                    <p><strong>Table exists:</strong> {schema.table_exists ? '✅ Yes' : '❌ No'}</p>
                                    <p><strong>Columns:</strong> {schema.columns ? schema.columns.join(', ') : 'N/A'}</p>
                                    <p><strong>Fillable fields:</strong> {schema.fillable ? schema.fillable.join(', ') : 'N/A'}</p>
                                    <p><strong>Casts:</strong> {schema.casts ? Object.keys(schema.casts).join(', ') : 'N/A'}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="border border-slate-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Validation Test</h2>
                        <p className="text-sm text-slate-600 mb-4">
                            Test validation rules for required fields: title, slug, content, category
                        </p>
                        <button
                            onClick={testValidation}
                            disabled={loading}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                            {loading ? 'Testing...' : 'Test Validation Rules'}
                        </button>
                    </div>

                    <div className="border border-slate-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Create Minimal Blog Test</h2>
                        <p className="text-sm text-slate-600 mb-4">
                            Test creating a blog with only the original database fields: title, content, upload_by, upload_time
                        </p>
                        <button
                            onClick={testCreateMinimal}
                            disabled={loading}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Minimal Blog'}
                        </button>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-yellow-800">Next Steps</h2>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-700">
                            <li>Run the migration: <code className="bg-yellow-100 px-1 rounded">php artisan migrate</code></li>
                            <li>Check if the new fields (slug, excerpt, category, status, etc.) are added to database</li>
                            <li>If migration fails, check the database schema and adjust accordingly</li>
                            <li>Update the factory and seeder to use new fields</li>
                            <li>Test the full blog API again</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}
