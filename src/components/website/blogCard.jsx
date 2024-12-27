import Button from "./Button_website";

function Card({ width }) {
  return (
    <div
      style={{
        width: width ? width : null,
      }}
      className={`shadow-lg w-[600px] border-[1px] border-border_primery lg:h-[245px] rounded-[24px] flex lg:flex-row flex-col gap-4 justify-center p-4 `}
    >
      <img
        className="rounded-xl"
        src="https://www.webnode.com/blog/wp-content/uploads/2016/10/Blog-intro.jpg"
        alt=""
      />
      <div className="content">
        <div className="flex flex-col mb-4 gap-3">
          <span className="title font-bold">
            a. Aliquam erat volutp nullam vitae ex id justo modo facilisis.
          </span>
          <div className="description text-[14px] line-clamp-4 mb-2 text-[#42526B]">
            Aenean interdum arcu sit amet nulla lacinia suscipit. Vivamus at
            laoreet mi. Fusce pulvinar commodo ligula, et egestas dolor. Ut
            hendrerit blandit neque in tempor. at laoreet mi. Fusce pulvinar
            commodo ligula, et egestas dolor at laoreet mi. Fusce pulvinar .
          </div>
        </div>
        {/* <div
          onClick={() => navigate("/blog", { id: "id" })}
          className="button flex items-center justify-center  gap-2 rounded-[5px] cursor-pointer bg-[#0B63E5] h-[40px] w-[121px]"
        >
          <span className="text-white font-bold text-[14px]">Read More</span>
          <span>
            <FontAwesomeIcon color="white" icon={faArrowRight} />
          </span>
        </div> */}
        <Button
          title={"read More"}
          wFull
          Func={() => {
            navigate("/blog", { id: "id" });
            sessionStorage.setItem("activeTab", "blogs");
            setActiveTabChanged("changed");
          }}
        />
      </div>
    </div>
  );
}

export default Card;
