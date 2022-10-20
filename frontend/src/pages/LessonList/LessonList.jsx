import "./LessonList.css";
// import back from "../../assets/back.jpg";
import Sidebar from "../../components/Sidebar/Sidebar";

const LessonList = () => {
  return (
    <div className="lesson-list">
      <Sidebar />
      <main>
        <header>
          <h1>
            Lesson <span> 1 </span>
          </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste
            repudiandae debitis est, quae minus distinctio quasi, tempora et cum
            nesciunt, voluptatem suscipit sint. Sit quis unde consequatur ad rem
            labore!
          </p>
          {/* <img src={#} alt="Edit Profile Logo" />  */}
        </header>
        <hr />
        <div className="body">
          <h1>
            What is <span>ASL</span>
          </h1>
          <p>
            <q>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste,
              sed quod. Accusamus, molestias. Adipisci illum, maiores suscipit
              voluptatum itaque aut saepe! Quibusdam inventore nesciunt natus
              quidem vel itaque illum ullam.
            </q>
          </p>
          <br />
          <p>
            <q>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste,
              sed quod. Accusamus, molestias. Adipisci illum, maiores suscipit
              voluptatum itaque aut saepe! Quibusdam inventore nesciunt natus
              quidem vel itaque illum ullam. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Magni modi aliquam laboriosam
              voluptas dolores animi temporibus in qui distinctio maxime aut
              assumenda, debitis suscipit quis, nam aspernatur illum est libero.
            </q>
          </p>
        </div>
      </main>
    </div>
  );
};
export default LessonList;
