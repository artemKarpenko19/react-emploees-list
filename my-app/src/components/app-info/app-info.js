import "./app-info.css";

const AppInfo = ({emploees, increased}) => {
    return (
        <div className="app-info">
            <h1>Учет сотруников в компании </h1>
            <h2>Общее число сотрудников {emploees}</h2>
            <h2>Премию получат: {increased} </h2>
        </div>
    )
}

export default AppInfo;