import React from "react";
import "./Login.css";
import Navbar from "./navbar";
import { baseurl } from "./baseurl";

class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
 

  componentDidMount() {
    var session = localStorage.getItem("session");
    if (session == 1) {
      fetch(baseurl + "/api/Dashboard", {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      })
        .then(res => res.json())
        .then(
          result => {
            var namesList = result.map((tasks, index) => {
              console.log("Projects",tasks);
              localStorage.setItem("project", JSON.stringify(tasks.Project));
              console.log("ProjectName",localStorage.getItem("project"));
              return (
                <tr key={tasks.Project}>
                  <td><a href="/AllTasks" onClick={()=>localStorage.setItem("projectName",tasks.Project)}>{tasks.Project}</a></td>
                  <td>{tasks.EstimatedHours}</td>
                </tr>
              );
            });

            this.setState({
              namesList: namesList
            });
          },
          error => {
            console.log("error");
            console.log(error);
          }
        );
    } else {
      alert("Session Not Found");
    }
    console.log("after fetch");
  }

  render() {
    console.log("Namelist ", this.state);
    return (
      <div>
        <Navbar />
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 container-fluid">
                <div className="card projectlist">
                  <div className="card-header card-header-primary">
                    <h4 className="card-title ">Project List</h4>
                    <p className="card-category"> List of all your tasks </p>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table" id="tasks">
                        <thead className=" text-primary">
                          <th className="projectpadding">Project</th>
                          <th>Estimated Hours</th>
                        </thead>
                        <tbody>{this.state.namesList}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProjectList;
