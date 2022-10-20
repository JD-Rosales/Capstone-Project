import "./Assignment.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import learn_illustration from "../../assets/edit_profile.png";
const Assignment = () => {
  return (
    <div className="assignment">
      <Sidebar />
      <main>
        <header>
          <h1>
            CLASS<span>WORK</span>
          </h1>
          <div className="header-content">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste
              repudiandae debitis est, quae minus distinctio quasi, tempora et
              cum nesciunt, voluptatem suscipit sint. Sit quis unde consequatur
              ad rem labore! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Tempora sunt enim neque odio autem minima fuga accusamus
              earum atque, placeat esse est recusandae omnis voluptas, vero
              itaque pariatur repudiandae illum!
            </p>
            <img src={learn_illustration} alt="learn illustration" />
          </div>
        </header>
      </main>
    </div>
  );
};
export default Assignment;
