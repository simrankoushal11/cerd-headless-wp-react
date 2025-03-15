import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
const API_URL = import.meta.env.VITE_API_BASE_URL;
const VITE_API_TOKEN = import.meta.env.VITE_API_TOKEN;

export default function TicketsLIst() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const handleclick = () => {
    navigate("/add");
  };
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  useEffect(() => {
    ticketList();
  }, []);
  async function ticketList() {
    let response = await fetch(API_URL);
    response = await response.json();
    setList(response);
  }
  const cleanAndTruncate = (html, length) => {
    const plainText = html.replace(/<[^>]*>?/gm, ""); // Remove HTML tags
    return plainText.length > length
      ? plainText.slice(0, length) + "..."
      : plainText;
  };
  async function handleDelete(e, id) {
    let response = await fetch(API_URL + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + VITE_API_TOKEN, // Replace with your JWT token
      },
    });
    response = await response.json();
    ticketList();
  }
  return (
    <div>
      <div className="w-50 mx-auto">
        <div className="w-100 text-end my-3">
          <button className="btn btn-primary" onClick={handleclick}>
            {" "}
            Add Ticket
          </button>
        </div>
        <table className="table table-primary">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Content</th>
              <th scope="col">Priority</th>
              <th scope="col">Date</th>
              <th scope="col">Active</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.title.rendered}</td>
                <td>{cleanAndTruncate(item.content.rendered, 15)}</td>
                <td>{item.meta.priority}</td>
                <td>{formatDate(item.date)}</td>
                <td>
                  <Link to={`/detail/${item.id}`}>View</Link> |
                  <Link to={`/edit/${item.id}`}>Edit</Link> |
                  <a
                    href="#"
                    className="mx-2"
                    onClick={(e) => handleDelete(e, item.id)}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
