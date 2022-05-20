const Diseases = require("../models/Disease");

class DiseaseControllers {
  // @route GET diseases/
  // @desc Reader list diseases
  // @access Private
  async reader(req, res) {
    try {
      const diseases = await Diseases.find().populate("user", [
        "username",
        "email",
      ]);

      res.json({
        success: true,
        message: "List diseases",
        diseases,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // @route POST diseases/create
  // @desc Create disease
  // @access Private
  async create(req, res) {
    const { name, description, body } = req.body;

    try {
      const newDiseases = new Diseases({
        name,
        description,
        body,
        user: req.userId,
      });
      await newDiseases.save();
      res.json({
        success: true,
        message: "Created diseases",
        diseases: newDiseases,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // @route GET diseases/:id
  // @desc Reader disease
  // @access Private
  async detail(req, res) {
    try {
      const disease = await Diseases.findOne({ _id: req.params.id })
        .populate("user", ["username", "email"])
        .exec();
      res.json({
        success: true,
        message: "diseases",
        disease,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // @route PUT diseases/update/:id
  // @desc Update disease
  // @access Private
  async update(req, res) {
    const { name, description, body } = req.body;

    try {
      let updateDisease = {
        name: name || "",
        description: description || "",
        body: body || "",
        updatedAt: Date.now(),
      };
      const diseaseUpdateCondition = { _id: req.params.id };
      updateDisease = await Diseases.findOneAndUpdate(
        diseaseUpdateCondition,
        updateDisease,
        { new: true }
      );

      if (!updateDisease) {
        return res.status(401).json({
          success: false,
          message: "Disease not found and don't update",
        });
      }
      res.json({
        success: true,
        message: "Updated Disease",
        disease: updateDisease,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // @route PUT diseases/delete/:id
  // @desc Delete disease
  // @access Private
  async trash(req, res) {
    res.json({ success: true, message: "Delete diseases" });
  }

  // @route DELETE diseases/destroy/:id
  // @desc Destroy disease
  // @access Private
  async destroy(req, res) {
    try {
      const destroyDisease = await Diseases.findOneAndDelete({
        _id: req.params.id,
      });
      if (!destroyDisease) {
        return res.status(401).json({
          success: false,
          message: "Disease not found and don't destroy",
        });
      }
      res.json({
        success: true,
        message: "Destroy Disease",
        disease: destroyDisease,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = new DiseaseControllers();
