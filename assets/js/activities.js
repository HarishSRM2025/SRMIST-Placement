const new_activities = document.getElementById('new_activities');
const activity_content=[
    {
        title:"Title-1",
        paragraph:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores pariatur at minima sed quidem corporis."
    },
    {
        title:"Title-2",
        paragraph:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores pariatur at minima sed quidem corporis."
    },
    {
        title:"Title-3",
        paragraph:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores pariatur at minima sed quidem corporis."
    },
    {
        title:"Title-4",
        paragraph:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores pariatur at minima sed quidem corporis."
    },
    {
        title:"Title-5",
        paragraph:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores pariatur at minima sed quidem corporis."
    },
    {
        title:"Title-6",
        paragraph:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores pariatur at minima sed quidem corporis."
    }
]
activity_content.map((e,i)=>{
    new_activities.innerHTML+=
    `<div class="activities-card">
        <div class="img">
            <img src="./assets/images/activities/${i+1}.png" alt="">
        </div>
        <div class="activities-content">
            <h3>${e.title}</h3>
        </div>
    </div>`
})
    
