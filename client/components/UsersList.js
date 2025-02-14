import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_USERS } from "../queries/usersQueries";
import User from "./User";
import Loader from "./Loader";

const limit = parseInt(process.env.limit) || 20;

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [showMore, setshowMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const { loading, error, fetchMore } = useQuery(GET_USERS, {
    variables: { offset: 0, limit: limit },
    onCompleted: (data) => {
      return setUsers(data.users);
    },
  });

  const fetchMoreUsers = async () => {
    const currentLength = users.length || 0;
    setLoadingMore(true);
    const moreUsers = await fetchMore({
      variables: {
        offset: currentLength,
        limit: currentLength + limit,
      },
    });
    setLoadingMore(false);
    moreUsers.data.users.length < limit && setshowMore(false);
    // setUsers([...users, ...moreUsers.data.users]);
  };

  if (loading) return <Loader />;
  if (error) return <p>Error occured</p>;

  return (
    <>
      {!loading && !error && users.length > 0 && (
        <ul className="user-list">
          {users.map((client) => (
            <User client={client} key={client.id} />
          ))}
          {showMore && !loadingMore && (
            <button className="load-more" onClick={fetchMoreUsers}>
              Load More
            </button>
          )}
        </ul>
      )}
      {loadingMore && <Loader />}
    </>
  );
};
export default UsersList;
