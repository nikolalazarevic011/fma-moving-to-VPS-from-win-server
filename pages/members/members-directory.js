// pages/members/members-directory.js

import { AcfVideo } from "components/acfVideo";
import { useEffect, useState } from "react";

const MembersDirectory = () => {
  // Retrieve the WordPress base URL from environment variables
  const wpBaseUrl = process.env.NEXT_PUBLIC_WP_URL;
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 100;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/members");
        const data = await res.json();

        if (res.ok) {
          console.log("Members data received:", data); // **Debug log**
          setMembers(data);
        } else {
          console.error("API Error:", data.message);
          setError(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch members:", error);
        setError("Failed to fetch members");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // **Fixed filtering with null checks**
  const filteredMembers = members.filter((member) => {
    const name = member.name || "";
    const church = member.church || "";
    const city = member.city || "";

    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      church.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // **Pagination calculations**
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const startIndex = (currentPage - 1) * membersPerPage;
  const endIndex = startIndex + membersPerPage;
  const currentMembers = filteredMembers.slice(startIndex, endIndex);

  // **Reset to first page when search changes**
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // **Pagination handlers**
  const goToPage = (page) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // **Generate page numbers for pagination**
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-primary">Loading members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Video Component */}
      <AcfVideo
        src={`${wpBaseUrl}/wp-content/uploads/2024/07/FMA-1.mov`}
        poster=""
        controls="0"
        autoplay={true}
        loop={true}
        heightProp="600"
        muted={true}
      />

      {/* Heading */}
      <h1 className="my-8 text-center text-4xl font-bold text-primary">
        FMA Members Directory
      </h1>

      {/* Search Input */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search by name, church, or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-80 rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* **Members Count and Pagination Info** */}
      <div className="mb-6 text-center">
        <p className="text-gray-600">
          Showing {currentMembers.length} of {filteredMembers.length} members
          {searchTerm && ` (filtered from ${members.length} total)`}
        </p>
        {totalPages > 1 && (
          <p className="mt-1 text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </p>
        )}
      </div>

      {/* **Debug Info - Only in Development** */}
      {process.env.NODE_ENV === "development" && members.length > 0 && (
        <div className="mx-auto mb-4 max-w-4xl rounded bg-gray-100 p-4">
          <p>
            <strong>Total Members:</strong> {members.length}
          </p>
          <p>
            <strong>Sample Member Data:</strong>
          </p>
          <pre className="mt-2 overflow-auto rounded bg-white p-2 text-xs">
            {JSON.stringify(members[0], null, 2)}
          </pre>
        </div>
      )}

      {/* Members List */}
      <div className="container mx-auto mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {currentMembers.length > 0 ? (
          currentMembers.map((member, index) => (
            <div
              key={startIndex + index}
              className="rounded-lg bg-white p-6 shadow-md"
            >
              <h2 className="mb-2 text-xl font-bold text-primary">
                {member.name || "No Name"}
              </h2>
              <p className="mb-2 text-gray-600">
                <strong>Church:</strong> {member.church || "Not specified"}
              </p>
              <p className="mb-1 text-gray-600">
                <strong>Address:</strong> {member.address || "Not specified"}
              </p>
              <p className="mb-1 text-gray-600">
                <strong>City:</strong> {member.city || "Not specified"}
              </p>
              <p className="mb-1 text-gray-600">
                <strong>Zip:</strong> {member.zip || "Not specified"}
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong> {member.phone || "Not specified"}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full py-8 text-center">
            <p className="text-lg text-gray-500">
              {searchTerm
                ? "No members found matching your search."
                : "No members found."}
            </p>
          </div>
        )}
      </div>

      {/* **Pagination Controls** */}
      {totalPages > 1 && (
        <div className="mb-8 flex items-center justify-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`rounded-lg px-4 py-2 font-medium ${
              currentPage === 1
                ? "cursor-not-allowed bg-gray-200 text-gray-400"
                : "bg-primary text-white hover:bg-primaryDark"
            }`}
          >
            Previous
          </button>

          {/* First Page */}
          {currentPage > 3 && (
            <>
              <button
                onClick={() => goToPage(1)}
                className="rounded-lg bg-gray-200 px-3 py-2 font-medium text-gray-700 hover:bg-gray-300"
              >
                1
              </button>
              {currentPage > 4 && <span className="text-gray-500">...</span>}
            </>
          )}

          {/* Page Numbers */}
          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              className={`rounded-lg px-3 py-2 font-medium ${
                pageNum === currentPage
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {pageNum}
            </button>
          ))}

          {/* Last Page */}
          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && (
                <span className="text-gray-500">...</span>
              )}
              <button
                onClick={() => goToPage(totalPages)}
                className="rounded-lg bg-gray-200 px-3 py-2 font-medium text-gray-700 hover:bg-gray-300"
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Next Button */}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`rounded-lg px-4 py-2 font-medium ${
              currentPage === totalPages
                ? "cursor-not-allowed bg-gray-200 text-gray-400"
                : "bg-primary text-white hover:bg-primaryDark"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* **Go to Page Input** */}
      {totalPages > 5 && (
        <div className="mb-8 flex items-center justify-center space-x-2">
          <span className="text-gray-600">Go to page:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              if (page >= 1 && page <= totalPages) {
                goToPage(page);
              }
            }}
            className="w-16 rounded border px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <span className="text-gray-600">of {totalPages}</span>
        </div>
      )}
    </div>
  );
};

export default MembersDirectory;
