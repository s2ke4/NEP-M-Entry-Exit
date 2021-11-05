import { useState, useEffect, React, useContext } from "react";
import { Redirect, useParams, Link } from "react-router-dom";
import { Table, Button, Message } from "semantic-ui-react";
import axios from "axios";
import Loader from '../../Shared/Loading/Loading'
import { UserContext } from "../../../Providers/UserProvider";

const RoleList = () => {
  const {info} = useContext(UserContext);
  const [data, setData] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const behost = process.env.REACT_APP_BACKEND_HOST;
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      let res = await axios.get(`${behost}access/getroles`);
      if (res.data.length > 0) {
        setData(res.data);
        setLoading(false);
      } else {
        setRedirect("/404");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${behost}access/delete/${id}`);
      let tempData = data.filter((d) => d.id !== id);
      setData(tempData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if(!info.isLoading){
      if (!info.user || info.user.role !== "admin") {
        if (!info.user) {
          setRedirect("/");
        } else if (info.user === "instructor") {
          setRedirect("/instructor/dashboard");
        } else {
          setRedirect("/student/dashboard");
        }
      } else {
        fetchData();
      }
    }
  }, [info]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className="ui container">
      <h2> Role List </h2>
      {loading?<Loader />:<div className="ui celled list">
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Sr. No</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((val, index) => (
              <Table.Row>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{val.name}</Table.Cell>
                <Table.Cell>{val.email}</Table.Cell>
                <Table.Cell>{val.role}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => handleDelete(val.id)}>Delete</Button>
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => setRedirect(`/admin/editrole/${val.id}`)}>Edit</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>}
      <Message>
        <strong>
          Add <Link to="/admin/addrole">New Roles</Link>
        </strong>
      </Message>
    </div>
  );
};

export default RoleList;
