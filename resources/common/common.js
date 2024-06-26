
import afterLoginHomeService from "../services/afterLoginHome.service";

async function handleLike(newIsLike, resType, resId) {
    let data;
    if (resType == 'event' || resType == 'Events') {
        data = {
            is_like: newIsLike,
            event_id: resId
        };
    } else {
        data = {
            is_like: newIsLike,
            event_id: resType === 'Events' || resType == 'event' ? resId : '',
            news_id: resType === 'News' || resType == 'news' ? resId : '',
            appeal_id: resType === 'Appeal' || resType == 'appeal' ? resId : '',
            video_id: resType === 'Video' || resType == 'video' ? resId : '',
        };
    }

    try {
        const response = await afterLoginHomeService.eventAddLike({ ...data });
        if (response.status === 200 || response.status === 201) {
            // API call successful, handle accordingly
        } else {
            console.error("Something went wrong");
        }
    } catch (error) {
        console.error("Error making API call:", error);
    }
};


async function handleSave(newIsSave, resType, resId) {
    let data;

    data = {
        is_save: newIsSave,
        event_id: resType === 'Events' || resType === 'event' ? resId : '',
        news_id: resType === 'News' || resType === 'news' ? resId : '',
        appeal_id: resType === 'Appeal' || resType === 'appeal' ? resId : '',
        video_id: resType === 'Video' || resType === 'video' ? resId : '',
    };    
    try {
        const response = await afterLoginHomeService.userSavePost({ ...data });
        if (response.status === 200 || response.status === 201) {
            // API call successful, handle accordingly
        } else {
            console.error("Something went wrong");
        }
    } catch (error) {
        console.error("Error making API call:", error);
    }
}

export { handleLike,handleSave };
