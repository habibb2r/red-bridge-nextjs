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
  return (
    <section className="py-10 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">
          Blood Group Compatibility
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow">
            <thead>
              <tr className="bg-red-500">
                <th className="py-2 px-4 border">Blood Group</th>
                <th className="py-2 px-4 border">Can Donate To</th>
                <th className="py-2 px-4 border">Can Receive From</th>
              </tr>
            </thead>
            <tbody>
              {compatibility.map((row) => (
                <tr key={row.group} className="text-center">
                  <td className="py-2 px-4 border font-bold text-red-500">
                    {row.group}
                  </td>
                  <td className="py-2 px-4 border text-green-600 font-bold">{row.donate}</td>
                  <td className="py-2 px-4 border text-red-600 font-bold">{row.receive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default BloodGroupCompatibility;
