import React from 'react';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to the UpHub home page",
};

const HomePage = () => {
  return (
    <div>
      <p className={"text-base"}>Hello World</p>
      <div>tôi là người Việt Nam</div>
      <div>A ab ad, aliquam animi aut cumque deserunt dolorum earum est impedit iure labore laborum magnam minima modi
        nostrum odit placeat provident quia quibusdam, quisquam quod sint, suscipit veniam veritatis?
      </div>
      <div>Accusamus ad beatae cumque, doloribus dolorum incidunt, inventore ipsa ipsum iusto natus officia pariatur,
        tenetur. Ad amet assumenda dicta dignissimos earum harum magni omnis, pariatur quibusdam! Aut minima obcaecati
        porro?
      </div>
      <div>Adipisci alias animi culpa cum delectus dignissimos doloremque eligendi est exercitationem fugiat impedit,
        laboriosam laudantium mollitia natus nihil numquam odio pariatur provident quam quasi quibusdam, rem
        reprehenderit tempora voluptates voluptatibus!
      </div>
    </div>
  );
};

export default HomePage;
