import { server } from '../config';
import styled from "styled-components"
import GlobalStyle from "../styles/globalStyles";
import Image from 'next/image'

import moment from 'moment';
moment.locale('nl');

const Feed = styled.div`
  margin: auto;
  max-width: 1000px;
  background: #fff;
  box-shadow: 0 0 2px 2px rgb(0 0 0 / 10%);
  border-radius: 3px;
`;

const Item = styled.a`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 120px 1fr;
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
  text-decoration: none;
  color: inherit;

  &:hover {
    background: linear-gradient(90deg, #f8f6f7, #fff);
  }

  h3,
  h3 + p {margin: 0;}

  div:first-child {margin-bottom: auto !important;}
  div:first-child img {border-radius: 3px; overflow: hidden;}
`;

function Home({items}) {

  return (
      <>
      <GlobalStyle/>
        <Feed>
        <h1>Gamefeed.nl</h1>
          {items.map((item, index) => (
            <Item key={index} href={`https://www.youtube.com/watch?v=${item.videoId}`} rel="noopener noreferrer" target="_blank">
              <Image src={item.image} alt={item.title} width={120} height={90} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <small>{moment(item.publishedAt).format("DD MMMM YYYY hh:mm", "nl")}</small>
              </div>
            </Item>
          ))}
        </Feed>
      </>
    )
}

export async function getServerSideProps() {

  const res = await fetch(`${server}/api`)
  const items = await res.json()

  return {
    props: {
      items,
    },
  }
}

export default Home