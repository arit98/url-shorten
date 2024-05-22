import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";

const UrlShortner = ({ urlList = [] }) => {
  const [data, setData] = useState(urlList || []);
  const [newUrl, setNewUrl] = useState("");
  const [error, setError] = useState(null); // State to handle errors

  // Handle form submission to create a new short URL
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await fetch("/api/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: newUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to create short URL");
      }

      const content = await response.json();
      if (content) {
        setData([content, ...data]);
        setNewUrl("");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>URL Shortener</title>
      </Head>
      <main className="content">
        <div className="container">
          <h2 className="mb-3">URL Shortener</h2>
          <form className="mb-3" onSubmit={handleOnSubmit}>
            <input
              type="text"
              className="w-75"
              placeholder="Enter long URL..."
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-dark mx-2">
              Create Short URL
            </button>
          </form>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="table-responsive custom-table-responsive">
            <table className="table custom-table">
              <thead>
                <tr>
                  <th scope="col">Long URL</th>
                  <th scope="col">Short URL</th>
                  <th scope="col">Clicked</th>
                </tr>
              </thead>
              <tbody>
                {data.map((urlObject) => (
                  <React.Fragment key={urlObject.code}>
                    <tr>
                      <td>
                        <a href={urlObject.url}>
                          {urlObject.url.length > 120
                            ? `${urlObject.url.slice(0, 120)}...`
                            : urlObject.url}
                        </a>
                      </td>
                      <td>
                        <Link href={`/api/${urlObject.code}`}>
                          {urlObject.code}
                        </Link>
                      </td>
                      <td>{urlObject.clicked}</td>
                    </tr>
                    <tr className="spacer">
                      <td colSpan="100"></td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default UrlShortner;

export async function getServerSideProps() {
  try {
    const res = await fetch("http://localhost:3000/api/url");
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const urlList = await res.json();
    return {
      props: { urlList },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        urlList: [],
        error: "Failed to fetch data",
      },
    };
  }
}
