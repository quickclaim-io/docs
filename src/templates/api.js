import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import groupBy from "lodash.groupby";
import SpecInformation from "~/spec/SpecInformation";
import SpecPaths from "~/spec/SpecPaths";
import g from "glamorous";
import logo from "../assets/images/logo.png";

const backStyle = {
  marginBottom: "1rem",
};

const Api = (props) => {
  const api = props.data.openApiSpec;
  const paths = api.childrenOpenApiSpecPath;
  const pathGroups = groupBy(paths, (p) => p.tag);
  console.log({ pathGroups });
  return (
    // <div style={{ backgroundColor: "red" }}>
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* <g.Div css={backStyle}>
        <Link to="/">Back</Link>
      </g.Div>
      <SpecInformation
        title={api.title}
        version={api.version}
        description={api.description}
      /> */}
      {/* <div style={{ display: "flex", flexDirection: "row" }}> */}
      <nav
        style={{
          width: 260,
          display: "flex",
          position: "relative",
          backgroundColor: "#323334",
        }}
      >
        <ul
          style={{
            position: "fixed",
            listStyle: "none",
            margin: 0,
            width: 260,
          }}
        >
          <img src={logo} width={150} style={{ margin: 20 }} />

          {Object.keys(pathGroups).map((t) => {
            console.log({ t });
            return (
              <li
                onClick={(e) => {
                  let section = document.getElementById(t);
                  console.log({ section });
                  e.preventDefault(); // Stop Page Reloading
                  section &&
                    section.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }}
                key={t}
                className="nav-link"
              >
                {t}
              </li>
            );
          })}
        </ul>
      </nav>
      <main
        style={{
          margin: 0,
          padding: 20,
          display: "block",
          flex: "1 1 0%",
          height: "100%",
          overflow: "hidden auto",
        }}
      >
        {Object.keys(pathGroups).map((t) => {
          return <SpecPaths key={t} tag={t} paths={pathGroups[t]} />;
        })}
      </main>
      {/* </div> */}
    </div>
  );
};
// }

Api.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Api;

export const query = graphql`
  query ApiQuery($id: String!) {
    openApiSpec(id: { eq: $id }) {
      version
      title
      description
      childrenOpenApiSpecPath {
        name
        verb
        operationId
        summary
        description
        fullPath
        parameters {
          name
          in
          description
          required
          type
          format
        }
        tag
        childrenOpenApiSpecResponse {
          id
          statusCode
          description
          childrenOpenApiSpecDefinition {
            name
            properties {
              name
              type
              description
              format
            }
          }
        }
      }
    }
  }
`;
