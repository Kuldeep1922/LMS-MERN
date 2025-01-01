import { CourseProgress } from "../models/courseProgress.js";
import { Course } from "../models/course.model.js";

export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    // fetch the user course progress
    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    }).populate("courseId");
    const courseDetails = await Course.findById(courseId).populate("lectures");
    if (!courseDetails) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // if no progress found return course details and empty progress
    if (!courseProgress) {
      return res.status(200).json({
        data: {
          courseDetails,
          progress: [],
          completed: false,
        },
      });
    }

    // return the user's course progress along with the course details
    return res.status(200).json({
      data: {
        courseDetails,
        progress: courseProgress.lectureProgress,
        completed: courseProgress.completed,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;
    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    });
    if (!courseProgress) {
      courseProgress=new CourseProgress({
        userId,
        courseId,
        completed: false,
        lectureProgress: [],
      });
    }
    const lectureIndex = courseProgress.lectureProgress.findIndex(
      (lecture) => lecture.lectureId === lectureId
    );
    if (lectureIndex !== -1) {
      courseProgress.lectureProgress[lectureIndex].viewed = true;
    } else {
      // add new lecture progress
      courseProgress.lectureProgress.push({
        lectureId,
        viewed: true,
      });
    }
    //   if all ecture is completed
    const lectureProgressLength = courseProgress.lectureProgress.filter(
      (lectureProg) => lectureProg.viewed
    ).length;
    const course = await Course.findById(courseId);
    if (course.lectures.length === lectureProgressLength) {
      courseProgress.completed = true;
    }
    await courseProgress.save();
    res.status(200).json({
      message: "Lecture updated successfully...",
    });
  } catch (error) {
    console.log(error);
  }
};

export const markAsCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;
    const courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress) {
      res.status(404).json({
        message: "Course progress not found...",
      });
      }
      courseProgress.lectureProgress.map((lectureProgress)=>lectureProgress.viewed=true)
      courseProgress.completed = true
      await courseProgress.save()
      return res.status(200).json({
          message:"Course marked as Completed..."
      })
  } catch (error) {
    console.log(error);
  }
};
export const markAsIncompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;
    const courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress) {
      res.status(404).json({
        message: "Course progress not found...",
      });
      }
      courseProgress.lectureProgress.map((lectureProgress)=>lectureProgress.viewed=false)
      courseProgress.completed = false
      await courseProgress.save()
      return res.status(200).json({
          message:"Course marked as Incompleted..."
      })
  } catch (error) {
    console.log(error);
  }
};
