import styles from "../styles/Home.module.css";

const HowItsBuilt = () => {
  return (
    <div className="grid grid-cols-8 my-40">
      <div
        className={
          "flex flex-col justify-start items-center | md:col-start-2 col-span-8 md:col-span-6 | rounded-xl | " +
          styles.dropshadow
        }
      >
        <b className="text-4xl font-title text-center my-16">
          How It's Built
        </b>
        <p className="font-paragraph text-center mx-4 xs:mx-16 mb-16">
          Donec ut neque lorem. Sed ac aliquam erat. Vestibulum neque magna,
          congue a volutpat at, porttitor at ligula. Donec ut neque lorem Donec
          ut neque lorem. Sed ac aliquam erat. Vestibulum neque magna, congue a
          volutpat at, porttitor at ligula. Donec ut neque loremDonec ut neque
          lorem. Sed ac aliquam erat. Vestibulum neque magna, congue a volutpat
          at, porttitor at ligula. Donec ut neque loremDonec ut neque lorem. Sed
          ac aliquam erat. Vestibulum neque magna, congue a volutpat at,
          porttitor at ligula. Donec ut neque loremDonec ut neque lorem. Sed ac
          aliquam erat. Vestibulum neque magna, congue a volutpat at, porttitor
          at ligula. Donec ut neque lorem
        </p>
        <div className="flex justify-center items-center rounded-2xl">
            <a href="https://ibb.co/mR969NX"><img src="https://i.ibb.co/QJPrPDC/healthy.jpg" alt="healthy" /></a>
        </div>
      </div>
    </div>
  );
};

export default HowItsBuilt;
