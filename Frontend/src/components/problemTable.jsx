import arr from "../sampleJson.json";

const problemTable = () => {
    return (

        <div class="place-items-center pl-40 pt-11 aspect-video">
            <table class="border-collapse border border-slate-400">
                <thead>
                    <tr>
                        <th scope="col" class="border-collapse border border-slate-400">S.No</th>
                        <th scope="col" class="border-collapse border border-slate-400">Problem</th>
                        <th scope="col" class="border-collapse border border-slate-400">Difficulty</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arr.map(prob => {
                            return (
                                <tr>
                                    <th scope="row" class="border-collapse border border-slate-400">1</th>
                                    <td class="border-collapse border border-slate-400">{prob.Title}</td>
                                    <td class="border-collapse border border-slate-400">{prob.Difficulty}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>

    );
};

export default problemTable;