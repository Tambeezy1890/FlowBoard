import { useState } from "react";

function AddColumnForm({ addColumn }) {
  const [title, setTitle] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addColumn(title);
        setTitle("");
      }}
      className="bg-white/20 p-3 rounded-xl min-w-60"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add another list"
        className="w-full bg-transparent text-white outline-none"
      />
    </form>
  );
}

export default AddColumnForm;
