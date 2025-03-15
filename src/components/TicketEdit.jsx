import React, { useActionState, useEffect, useState } from "react";
import { useParams } from "react-router";
const API_URL = import.meta.env.VITE_API_BASE_URL;
const VITE_API_TOKEN = import.meta.env.VITE_API_TOKEN;
export default function TicketEdit() {
  const [editdata, setEditData] = useState([]);
  const { id } = useParams();
  if (id) {
    useEffect(() => {
      getTicketData();
    }, []);
  }
  async function getTicketData() {
    let response = await fetch(API_URL + "/" + id);
    response = await response.json();
    setEditData(response);
  }
  const handleinputs = (predata, formData) => {
    let title = formData.get("title");
    let content = formData.get("content");
    if (!title) {
      return { error: "Insert ticket title" };
    } else if (!content || content.length < 50) {
      return { error: "Insert content with more than 50 words." };
    } else {
      //formData.append("status", "publish");
      const meta = {
        department: formData.getAll("department"),
        priority: formData.get("priority"),
        team: formData.getAll("team"),
      };
      formData.append("meta", JSON.stringify(meta));
      const requestData = {
        title: formData.get("title"),
        content: formData.get("content"),
        department: formData.getAll("department") || [],
        priority: formData.get("priority") || [],
        team: formData.getAll("team") || [],
        meta: meta, // Send as an object, not a string
        status: "publish",
      };
      handleSubmit(requestData);
    }
  };
  async function handleSubmit(formData) {
    let response = await fetch(API_URL + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + VITE_API_TOKEN, // Replace with your JWT token
      },
      body: JSON.stringify(formData),
    });
    response = response.json();
    getTicketData();
  }
  const handleCheckboxChange = ({ target }) => {
    const { name, value, checked } = target;

    setEditData((prev) => {
      const updatedArray = checked
        ? [...(prev.meta?.[name] || []), value] // Add value if checked
        : (prev.meta?.[name] || []).filter((item) => item !== value); // Remove if unchecked

      return {
        ...prev,
        meta: {
          ...prev.meta,
          [name]: updatedArray, // Updates the selected checkboxes dynamically
        },
      };
    });
  };

  const [data, action, pending] = useActionState(handleinputs);
  return (
    <div>
      <div className="w-50 mx-auto">
        <form className="mb-5" action={action}>
          <div className="row box-shadow">
            <h2 className="text-center mb-5">Added Ticket</h2>
            <div className="message-box py-3">
              {data ? (
                data.message ? (
                  <span className="text-green">{data.message}</span>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              {data ? (
                data.error ? (
                  <span className="text-red">{data.error}</span>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
            <div className="mb-3 col-md-12">
              <input
                type="text"
                className="form-control"
                name="title"
                id="title"
                placeholder="Enter title"
                value={editdata?.title?.rendered || ""}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    title: { ...prev.title, rendered: e.target.value },
                  }))
                }
              />
            </div>
            <div className="mb-3 col-md-12">
              <textarea
                className="form-control"
                name="content"
                id="content"
                rows="3"
                placeholder="Enter content"
                value={editdata?.content?.rendered}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, content: e.target.value }))
                }
              ></textarea>
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Department</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  name="department"
                  type="checkbox"
                  id="design"
                  value={"design"}
                  checked={
                    editdata?.meta?.department?.includes("design") || false
                  }
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="design">
                  Design
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  name="department"
                  type="checkbox"
                  id="development"
                  value={"development"}
                  checked={
                    editdata?.meta?.department?.includes("development") || false
                  }
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="development">
                  Development
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  name="department"
                  type="checkbox"
                  id="testing"
                  value={"testing"}
                  checked={
                    editdata?.meta?.department?.includes("testing") || false
                  }
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="testing">
                  Testing
                </label>
              </div>
            </div>
            <div className="mb-3 col-md-6">
              <label htmlFor="priority" className="form-label">
                Priority
              </label>
              <select
                className="form-select"
                id="priority"
                name="priority"
                defaultChecked={data?.priority}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Team</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  name="team"
                  type="checkbox"
                  id="php"
                  value={"php"}
                  onChange={handleCheckboxChange}
                  checked={editdata?.meta?.team?.includes("php") || false}
                />
                <label className="form-check-label" htmlFor="php">
                  Php
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  name="team"
                  type="checkbox"
                  id="full-stack"
                  value={"full-stack"}
                  onChange={handleCheckboxChange}
                  checked={
                    editdata?.meta?.team?.includes("full-stack") || false
                  }
                />
                <label className="form-check-label" htmlFor="full-stack">
                  Full Stack
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  name="team"
                  type="checkbox"
                  id="designteam"
                  value={"design"}
                  onChange={handleCheckboxChange}
                  checked={editdata?.meta?.team?.includes("design") || false}
                />
                <label className="form-check-label" htmlFor="designteam">
                  Design
                </label>
              </div>
            </div>
            <div className="mb-3 col-md-6">
              <label htmlFor="attachment" className="form-label">
                Attachment
              </label>
              <input
                className="form-control"
                name="report"
                type="file"
                id="attachment"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
