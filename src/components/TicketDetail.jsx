import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function TicketDetail() {
  const [detail, setDetail] = useState();
  const { id } = useParams();
  useEffect(() => {
    getTicketDetails();
  }, []);
  async function getTicketDetails(params) {
    let response = await fetch(API_URL + "/" + id);
    response = await response.json();
    setDetail(response);
  }
  const cleanAndTruncate = (html, length) => {
    const plainText = html.replace(/<[^>]*>?/gm, ""); // Remove HTML tags
    return plainText.length > length
      ? plainText.slice(0, length) + "..."
      : plainText;
  };
  return (
    <>
      {detail ? (
        <div className="w-50 mx-auto">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{detail.title.rendered}</h5>
              <p className="card-text">
                {cleanAndTruncate(detail.content.rendered)}
              </p>
              <p className="card-text">
                Priority:{" "}
                <span className="text-capitalize">{detail.meta.priority}</span>
              </p>
              <p className="card-text">
                Departemnt:
                {detail.meta.department.map((item, index) => (
                  <spna className="text-capitalize"> {item} | </spna>
                ))}
              </p>
              <p className="card-text">
                Team:
                {detail.meta.team.map((item, index) => (
                  <spna className="text-capitalize"> {item} | </spna>
                ))}
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
