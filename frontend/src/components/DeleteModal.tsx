"use client";

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteModal({
  open,
  onCancel,
  onConfirm,
}: Props) {

  if (!open) return null;

  return (

    <div className="
      fixed inset-0
      bg-black/40
      flex items-center justify-center
      z-50
    ">

      <div className="
        bg-white
        rounded-2xl
        p-6
        w-96
        shadow-xl
      ">

        <h2 className="text-lg font-semibold">
          Delete Chat
        </h2>

        <p className="mt-2 text-gray-600">
          Are you sure you want to delete this chat?
        </p>

        <div className="
          mt-6
          flex justify-end gap-3
        ">

          <button
            onClick={onCancel}
            className="
              px-4 py-2
              rounded-lg
              border
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
              px-4 py-2
              rounded-lg
              bg-red-600
              text-white
            "
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );
}