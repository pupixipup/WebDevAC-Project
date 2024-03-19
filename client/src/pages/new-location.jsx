import { useState } from "react";
import { useNavigate } from "react-router-dom"
export const NewLocation = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('image', file);
    formData.append("name", title);
    formData.append("address", address);
    formData.append("category", category);
    formData.append("url", url);

    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + '/locations', {
        method: 'POST',
        // headers: { "Content-Type": "multipart/form-data" },
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        navigate("/");
        alert("New location added");
        console.log('Image uploaded successfully');
      } else {
        console.log(response)
        setErr(response.statusText);
        console.error('Failed to upload image');
      }
    } catch (error) {
      setErr(error);
      console.error('Error uploading image:', error);
    }
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };


  return(
  <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <input placeholder="category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <input placeholder="url" value={url} onChange={(e) => setUrl(e.target.value)} />
      <input placeholder="name" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <button type="submit">Add</button>
      {err && <p>{err}</p>}
    </form>)
}