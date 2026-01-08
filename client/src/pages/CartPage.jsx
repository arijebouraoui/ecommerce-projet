import { useState, useEffect, useRef } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import dropin from "braintree-web-drop-in";
import axios from "axios"; // ← IMPORTANT!
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const dropinContainerRef = useRef(null);
  const navigate = useNavigate();

  // Prix en Dinars Tunisiens
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("fr-TN") + " DT";
    } catch (error) {
      console.log(error);
      return "0 DT";
    }
  };

  const formatPrice = (price) => {
    if (!price) return '0 DT';
    return price.toLocaleString("fr-TN") + " DT";
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  useEffect(() => {
    if (clientToken && cart?.length > 0) {
      if (instance) {
        instance.teardown();
      }

      dropin.create(
        {
          authorization: clientToken,
          container: dropinContainerRef.current,
          paypal: {
            flow: "vault",
          },
        },
        (error, dropinInstance) => {
          if (error) {
            console.error(error);
            return;
          }
          setInstance(dropinInstance);
        }
      );
    }

    return () => {
      if (instance) {
        instance.teardown();
      }
    };
  }, [clientToken, cart?.length]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Paiement effectué avec succès!");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Bonjour ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `Vous avez ${cart.length} article${cart.length > 1 ? 's' : ''} dans votre panier ${
                    auth?.token ? "" : "- Connectez-vous pour payer"
                  }`
                : "Votre panier est vide"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height={"100px"}
                  />
                </div>
                <div className="col-md-8">
                  <p><strong>{p.name}</strong></p>
                  <p className="text-muted">{p.description.substring(0, 30)}...</p>
                  <p className="text-success fw-bold">Prix: {formatPrice(p.price)}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Résumé du Panier</h2>
            <p>Total | Paiement | Livraison</p>
            <hr />
            <h4>Total: <span className="text-success">{totalPrice()}</span></h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Adresse de Livraison</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Modifier l'Adresse
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Ajouter une Adresse
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Connectez-vous pour payer
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                <p>Chargement des options de paiement...</p>
              ) : (
                <>
                  <div ref={dropinContainerRef}></div>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Traitement..." : "Procéder au Paiement"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;