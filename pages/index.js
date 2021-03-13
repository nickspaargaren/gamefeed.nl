import { server } from '../config';
import styled from "styled-components"

const Feed = styled.div`
  margin: auto;
  max-width: 1000px;
`;

const Item = styled.a`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 120px 1fr;
  padding: 10px 0;
  border-bottom: 1px solid #aaa;
  text-decoration: none;
  color: inherit;

  h3,
  h3 + p {margin: 0;}
`;

function Home({items}) {

  return (
      <>
        <Feed>
          <h1>Gamefeed.nl</h1>
          {items.map((item, index) => (
            <Item key={index} href={`https://www.youtube.com/watch?v=${item.videoId}`} rel="noopener noreferrer" target="_blank">
              <img src={item.image} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </Item>
          ))}
        </Feed>
      </>
    )
}

export async function getStaticProps() {

  const res = await fetch(`${server}/api`)
  const items = await res.json()

  return {
    props: {
      items,
    },
  }
}

export default Home