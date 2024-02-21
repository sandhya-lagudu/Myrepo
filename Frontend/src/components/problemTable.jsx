// import arr from "../sampleJson.json";

export function ProblemTable(props) {
    const MyObject=props.pr;
    const obj = Object.entries(MyObject);
    obj.forEach(([key, value]) => console.log(key, value));
    return (
        <div class="place-items-center pl-40 pt-11 aspect-video">
            {/* <table class="border-collapse border border-slate-400">
                <thead>
                    <tr>
                        <th scope="col" class="border-collapse border border-slate-400">Problem</th>
                        <th scope="col" class="border-collapse border border-slate-400">Difficulty</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // Array(arr)
                        
                        // <tr>
                        //     <td class="border-collapse border border-slate-400">{title}</td>
                        //     <td class="border-collapse border border-slate-400">{difficulty}</td>
                        // </tr>                         
                        
                    }
                </tbody>
            </table> */}
            
        </div>
    );
};

