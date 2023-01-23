import isAuthenticated from "./api/Auth";
import getCookie from "next-cookies";

export default function Protected() {
  return <div>ayoub</div>;
}

Protected.getInitialProps = async (context) => {
  const { NutriLab } = getCookie(context);

  if (!isAuthenticated(NutriLab)) {
    context.res.writeHead(302, { Location: "/login" });
    context.res.end();
    return {};
  }
  return {};
};
