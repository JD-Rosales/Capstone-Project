import './TeacherDashboard.css'
import teacher2 from "../../assets/Teacher2.png"
import TeacherSidebar from '../../components/Sidebar/TeacherSidebar'
const TeacherDashboard = () =>{
    return(
        <div className="teacher-dashboard">
             <TeacherSidebar isTeacher="true" />
            <div className="main">
                <div className="header-container">
                    <div className="header">
                        <h1>WELCOME BACK <span>?NAME?</span></h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, consequatur sed, expedita quidem at aut aperiam,
                            nemo iure sit quam eaque exercitationem debitis sunt accusamus. Quis, provident. Incidunt, ratione  xercitationem debitis sunt accusamus.
                             Quis, provident. Incidunt, rationquis. Quis, provident. I sed, expedita quidem </p>
                    </div>
                    <img src={teacher2} alt="Teacher icon" />
                 </div>
            </div>
            <div className="body-container">
                <div className="first-section">
                    <h1> ENROLLED <br/> <span>STUDENT</span></h1>
                    
                </div>
                <div className="sub-container">
                    <div className="first-sub-section">
                        <h1>CLASS<span>CODE</span></h1>
                        <p>ClassCodehere?</p>
                    </div>
                    <div className="second-sub-section">
                        <h1>TOTAL <span>LESSONS</span></h1>
                        <h1 id="FL">5</h1>
                    </div>
                </div>
                <div className="second-section">
                    <h1>MANAGE <span>LESSONS</span></h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos animi laborum
                        blanditiis fuga explicabo tempora autem, a incidunt nobis minima ullam aperiam sed 
                        oluta unde possimus beatae esse ex.</p>
                    <button className="btn-learn">MANAGE</button>
                </div>
            </div>
        </div>
    )

}
export default TeacherDashboard