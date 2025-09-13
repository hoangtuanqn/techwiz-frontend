import { User, Mail, Phone, Save } from 'lucide-react';

export default function PersonalInformationPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Personal Information</h1>
      <p className="text-gray-600 mb-6">Update your photo and personal details here.</p>

      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Profile Picture Section */}
          <div className="md:col-span-1 flex flex-col items-center text-center">
            <img
              src="https://avatar.vercel.sh/personal" // Placeholder image from vercel avatar service
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-200 shadow-sm"
            />
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
              Change Photo
            </button>
            <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
          </div>

          {/* Form Section */}
          <div className="md:col-span-2">
            <form className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    className="block w-full rounded-lg border-gray-300 pl-10 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-lg border-gray-300 pl-10 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="block w-full rounded-lg border-gray-300 pl-10 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="+1 (555) 987-6543"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}