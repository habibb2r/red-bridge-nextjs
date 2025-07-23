import { Droplet } from "lucide-react";

const BloodGroupCompatibility = () => {
  const compatibility = [
    { group: "O-", donate: "All", receive: "O-" },
    { group: "O+", donate: "O+, A+, B+, AB+", receive: "O-, O+" },
    { group: "A-", donate: "A-, A+, AB-, AB+", receive: "O-, A-" },
    { group: "A+", donate: "A+, AB+", receive: "O-, O+, A-, A+" },
    { group: "B-", donate: "B-, B+, AB-, AB+", receive: "O-, B-" },
    { group: "B+", donate: "B+, AB+", receive: "O-, O+, B-, B+" },
    { group: "AB-", donate: "AB-, AB+", receive: "O-, A-, B-, AB-" },
    { group: "AB+", donate: "AB+", receive: "All" },
  ];
  const groupColor = (group: string) => {
    if (group.includes("O-")) return "bg-red-600 text-white";
    if (group.includes("O+")) return "bg-red-400 text-white";
    if (group.includes("A-")) return "bg-blue-600 text-white";
    if (group.includes("A+")) return "bg-blue-400 text-white";
    if (group.includes("B-")) return "bg-green-600 text-white";
    if (group.includes("B+")) return "bg-green-400 text-white";
    if (group.includes("AB-")) return "bg-purple-600 text-white";
    if (group.includes("AB+")) return "bg-purple-400 text-white";
    return "bg-gray-300 text-black";
  };
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 ">
            <Droplet className="h-8 w-8 text-red-500  animate-bounce drop-shadow-lg tracking-tight" />
            <h2 className="text-3xl font-bold text-black ">
              Blood Group Compatibility
            </h2>
          </div>
          <p className="text-gray-500 mt-2 text-center max-w-xl">
            Discover which blood groups can donate to or receive from each other.
            Hover or tap a row for details.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-2xl shadow-xl overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-red-500 to-pink-400 text-white">
                <th className="py-3 px-4 border-b text-lg font-semibold">
                  Blood Group
                </th>
                <th className="py-3 px-4 border-b text-lg font-semibold">
                  Can Donate To
                </th>
                <th className="py-3 px-4 border-b text-lg font-semibold">
                  Can Receive From
                </th>
              </tr>
            </thead>
            <tbody>
              {compatibility.map((row) => (
                <tr
                  key={row.group}
                  className="text-center transition-all duration-200 hover:bg-red-50 cursor-pointer group"
                >
                  <td className="py-3 px-4 border-b">
                    <span
                      className={`inline-block rounded-full px-4 py-1 font-bold shadow-md text-lg transition-all duration-200 group-hover:scale-110 ${groupColor(
                        row.group
                      )}`}
                    >
                      {row.group}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b">
                    {row.donate === "All" ? (
                      <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full font-semibold animate-pulse">
                        All Groups
                      </span>
                    ) : (
                      row.donate.split(", ").map((g) => (
                        <span
                          key={g}
                          className={`inline-block mx-1 my-1 px-3 py-1 rounded-full font-semibold text-sm shadow-sm ${groupColor(
                            g
                          )} animate-fadein`}
                        >
                          {g}
                        </span>
                      ))
                    )}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {row.receive === "All" ? (
                      <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full font-semibold animate-pulse">
                        All Groups
                      </span>
                    ) : (
                      row.receive.split(", ").map((g) => (
                        <span
                          key={g}
                          className={`inline-block mx-1 my-1 px-3 py-1 rounded-full font-semibold text-sm shadow-sm ${groupColor(
                            g
                          )} animate-fadein`}
                        >
                          {g}
                        </span>
                      ))
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-3 mt-6 justify-center text-xs">
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-red-600 inline-block"></span>{" "}
            O-
          </span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-blue-600 inline-block"></span>{" "}
            A-
          </span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-green-600 inline-block"></span>{" "}
            B-
          </span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-purple-600 inline-block"></span>{" "}
            AB-
          </span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-red-400 inline-block"></span>{" "}
            O+
          </span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-blue-400 inline-block"></span>{" "}
            A+
          </span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-green-400 inline-block"></span>{" "}
            B+
          </span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-purple-400 inline-block"></span>{" "}
            AB+
          </span>
        </div>
        <style jsx>{`
          @keyframes fadein {
            from {
              opacity: 0.7;
            }
            to {
              opacity: 1;
            }
          }
          .animate-fadein {
            animation: fadein 1.2s ease-in-out;
          }
        `}</style>
      </div>
    </section>
  );
};

export default BloodGroupCompatibility;
