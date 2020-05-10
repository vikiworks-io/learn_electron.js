var main_container;
var ctr = 10;
function initialize(div_id)
{
    main_container = document.getElementById(div_id);
}

function update_progress_bar(percentage)
{
    base = 10;
    value = "width:"+percentage.toString(base)+"%";
    main_container.style = value;
}

async function periodic_update()
{
    while(ctr <= 100){
        await sleep(1000);
        update_progress_bar(ctr);
        ctr = ctr + 10;
    }
    
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function main()
{
    periodic_update();
}

initialize("progress_bar1");
main();
