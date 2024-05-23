import dbConnect from "../../../lib/mongodb";
import CostingResult from "../../models/CostingResult";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const costingResult = await CostingResult.create(req.body);
        res.status(201).json({ success: true, data: costingResult });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "GET":
      try {
        const costingResults = await CostingResult.find({});
        res.status(200).json({ success: true, data: costingResults });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
