import Layout from "../components/layouts/DefaultLayout";

import Content from "../components/pages/LandingPage/Content";
import Jumbotron from "../components/pages/LandingPage/Jumbotron";
import OrderCart from "../components/pages/LandingPage/OrderCart";

const Home = () => {
  return (
    <Layout>
      <Jumbotron />
      <Content />
      <OrderCart />
    </Layout>
  )
}

export default Home
