class Student < ApplicationRecord
  has_many :student_courses
  has_many :courses, through: :student_courses

  has_many :submissions

  has_secure_password
  validates :user_name, presence: true, uniqueness: true, length: {minimum: 3}
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, :format => {:with => /\A(?=.*[a-zA-Z])(?=.*[0-9]).{6,}\z/, message: "must be at least 6 characters and include one number and one letter."}

  def self.confirm(params)
    @student = Student.find_by({email: params[:email]})
    @student ? @student.authenticate(params[:password]) : false
  end

end
