import React, {useEffect, useState} from "react";
import {Layout} from "antd";
import AppHeader from "../../Component/AppHeader";
import AppFooter from "../../Component/Footer";
import {NoteList} from "../../Component/Content/NoteList";
import {AppContent} from "../../Component/AppContent";
import {doGet} from "../../Utils/ajax";
import {resp2Json} from "../../Utils/Tool";
import {ViewsRecommend} from "../../Utils/recommendUtil";

const ViewsRecommendView= () => {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                let recommendTravelIdList = await ViewsRecommend(5);
                // alert("recommendTravelIdList:" + recommendTravelIdList.length)
                //循环遍历recommendTravelIdList，去后端doGet
                let recommendTravelList = [];
                for (let i = 0; i <  recommendTravelIdList.length; i++) {
                    let recommendTravelId = recommendTravelIdList[i];
                    let recommendTravel = await doGet('/Travelogue/' + recommendTravelId);
                    recommendTravelList.push(resp2Json(recommendTravel).data);
                }
                setNotes(recommendTravelList);
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
export default ViewsRecommendView;