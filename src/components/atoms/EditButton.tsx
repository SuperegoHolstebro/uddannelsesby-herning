'use client'

export default function EditButton() {
  return (
    <>
      <div className="mt-4">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded"
          onClick={() => (window.location.href = `/karriere/edit`)}
        >
          Edit Page
        </button>
      </div>
    </>
  )
}
