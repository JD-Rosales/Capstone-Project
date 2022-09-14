import "./AdminManageRequest.css";
import Sidebar from "../../../components/Sidebar/Sidebar"
import manageRequestIllustration from "../../../assets/manageRequest.png"
const AdminManageRequest = () => {
    return(
        <div className="admin-manage-request">
            <Sidebar />
            <div className="main">
                <div className="manageRequestHeader">
                    <div>
                        <h1>
                            Manage <br/>
                            <span>Request</span>
                        </h1>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
                            metus eu dui ornare laoreet vitae ac nibh. Donec porttitor orci
                            sit amet aliquet rutrum. Nunc quis massa a nunc finibus
                            metus eu dui ornare laoreet vitae ac nibh. Donec porttitor orci
                            sit amet aliquet rutrum. Nunc quis massa a nunc finibus metus eu dui ornare laoreet vitae ac nibh. Donec porttitor orci
                            sit amet aliquet rutrum. Nunc quis massa a nunc finibus
                        </p>
                    </div>
                    <div> 
                        <img src={manageRequestIllustration} alt="Illustration" />
                    </div>

                </div>
                <div className="tbl-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                            </tr>
                        </thead>

                    </table>
                </div>
            </div>
        </div>
    )
}
export default AdminManageRequest;