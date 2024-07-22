const DailyOutput = require('../models/DailyOutput');

exports.getDailyOutputs = async (req, res) => {
  try {
    const dailyOutputs = await DailyOutput.find();
    res.status(200).json(dailyOutputs);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createDailyOutput = async (req, res) => {
  try {
    const dailyOutput = new DailyOutput(req.body);
    await dailyOutput.save();
    res.status(201).json(dailyOutput);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

exports.updateDailyOutput = async (req, res) => {
  try {
    const { id } = req.params;
    const dailyOutput = await DailyOutput.findByIdAndUpdate(id, req.body, { new: true });
    if (!dailyOutput) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(dailyOutput);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

exports.deleteDailyOutput = async (req, res) => {
  try {
    const { id } = req.params;
    const dailyOutput = await DailyOutput.findByIdAndDelete(id);
    if (!dailyOutput) return res.status(404).json({ error: 'Not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
