import React, {useEffect, useState} from "react";
import {Layout} from "antd";
import AppHeader from "../../Component/AppHeader";
import AppFooter from "../../Component/Footer";
import {NoteList} from "../../Component/Content/NoteList";
import {AppContent} from "../../Component/AppContent";
import {LatestRecommend} from "../../Utils/recommendUtil";

const LatestRecommendView= () => {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                let latestRecommend = await LatestRecommend(10);
                setNotes(latestRecommend);
                // console.log("recommendTravelList:", JSON.stringify(recommendTravelList));
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
export default LatestRecommendView;