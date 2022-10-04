import React, {useState, useEffect} from "react";
import AdminSearch from "./AdminSearch";

function AdminControls({currentUser}) {
    
    const [adminInfoOn, setAdminInfoOn] = useState(false)
    const [adminMode, setAdminMode] = useState("users")


    return (
        <div className="admin-control">
            <h2>Admin Access: {currentUser.username}</h2>
            <button onClick={() => setAdminInfoOn(!adminInfoOn)}>{adminInfoOn ? "Close Info" : "Open Info"}</button>
            {
                adminInfoOn ? 
                    <div>
                        <select onChange={(e) => setAdminMode(e.target.value)} value={adminMode}>
                            <option value="users" >Users</option>
                            <option value="characters" >Charcters</option>
                            <option value="items" >Items</option>
                            <option value="enemies" >Enemies</option>
                            <option value="spells" >Spells</option>
                        </select>

                        <AdminSearch typeSearch={adminMode} />
                    </div>
            : null}
        </div>
    )
}

export default AdminControls