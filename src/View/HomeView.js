import React, {useEffect, useState} from "react";
import {Layout} from "antd";
import AppHeader from "../Component/AppHeader";
import AppFooter from "../Component/Footer";
import {NoteList} from "../Component/Content/NoteList";
import {AppContent} from "../Component/AppContent";
import {useNavigate} from "react-router-dom";
import {doGet} from "../Utils/ajax";
import {resp2Json} from "../Utils/Tool";

const HomeView = (props) => {
    // const [Notes,setNotes]=useState([]);
    // useEffect(async () => {
    //     let notesInfo = await doGet('/Travelogue');
    //     setNotes(resp2Json(notesInfo));
    //     console.log("notesInfo"+JSON.stringify(notesInfo));
    // },[])
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const notesInfo = await doGet('/Travelogue');
                // console.log("notesInfo111111111" + JSON.stringify(notesInfo));
                const parsedNotes = resp2Json(notesInfo);
                console.log("notesInfo" + JSON.stringify(notesInfo.data));
                //
                setNotes(parsedNotes.data);
            } catch (error) {
                console.error("Failed to fetch notes:", error);
            }
        };

        fetchData();
    }, []);

        return(
            <Layout>
                <AppHeader />

                    <AppContent children={<NoteList notes={notes} />}/>
                <AppFooter/>
            </Layout>
        )

}
export default HomeView;