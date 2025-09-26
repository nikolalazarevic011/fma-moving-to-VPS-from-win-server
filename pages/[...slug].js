import { BlockRenderer } from "components/BlockRenderer";
import { getPageStaticProps } from "utils/getPageStaticProps";
import { gql } from "@apollo/client";
import client from "client";

export default function Page(props) {
  return (
    <div>
      <BlockRenderer blocks={props.blocks} /> {/* Page content */}
    </div>
  );
}

export const getStaticProps = getPageStaticProps; //getStaticProps needed when adding getStaticPaths , class 11. 

export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query AllPagesQuery {
        pages {
          nodes {
            uri
          }
        }
      }
    `,
  });

  return {
    paths: data.pages.nodes
      .filter((page) => page.uri !== "/") // Exclude home page
      .map((page) => ({
        params: {
          slug: page.uri.substring(1, page.uri.length - 1).split("/"),
        },
      })),
    fallback: "blocking", // for fetching more than just latest 10 created pages
  };
};
