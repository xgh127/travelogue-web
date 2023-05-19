import React, {useEffect, useState} from "react";
import {Layout} from "antd";
import AppHeader from "../Component/AppHeader";
import AppFooter from "../Component/Footer";
import {NoteList} from "../Component/Content/NoteList";
import {AppContent} from "../Component/AppContent";
import {useNavigate} from "react-router-dom";
import {doGet} from "../Utils/ajax";
import {resp2Json} from "../Utils/Tool";
import SearchBar from "../Component/SearchBar";

const SearchResultView = () => {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                //从url中解析出searchKey和searchType
                const url = window.location.href;
                const searchKey = url.split("?")[1].split("&")[0].split("=")[1];
                const searchType = url.split("?")[1].split("&")[1].split("=")[1];

                console.log("searchKey" + searchKey);
                console.log("searchType" + searchType);
                console.log('/Travelogue/?Travelogue.Title='+searchKey);
                //根据searchKey和searchType获取notes
                switch (parseInt(searchType)){
                    case 0://按照标题搜索
                        const notesInfo = await doGet('/Travelogue/?Travelogue.Title=(like)'+searchKey);
                        const parsedNotes = resp2Json(notesInfo);
                        setNotes(parsedNotes.data);
                        break;
                    case 1://按照作者搜索
                        const notesInfo1 = await doGet('/Travelogue/?Travelogue.Author.UserName=(like)'+searchKey);
                        const parsedNotes1 = resp2Json(notesInfo1);
                        setNotes(parsedNotes1.data);
                        break;
                    case 2://按照内容搜索
                        const notesInfo2 = await doGet('/Travelogue/?Travelogue.Content=(like)'+searchKey);
                        const parsedNotes2 = resp2Json(notesInfo2);
                        setNotes(parsedNotes2.data);
                        break;
                    case 3://按照标签搜索
                        const notesInfo3 = await doGet('/Travelogue/?Travelogue.Tag.Name=(like)'+searchKey);
                        const parsedNotes3 = resp2Json(notesInfo3);
                        setNotes(parsedNotes3.data);
                        break;
                }

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
export default SearchResultView;