import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={'About Us - Ecommerce app'}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
           Chez nous, chaque achat est simple, agréable et sûr. Nos produits sont soigneusement choisis pour leur qualité,
            et notre équipe est toujours là pour vous accompagner.
             Ici, votre satisfaction et votre confiance sont notre priorité, à chaque clic.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;