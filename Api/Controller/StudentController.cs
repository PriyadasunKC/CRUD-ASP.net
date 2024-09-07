using Api.Data;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    // api/students
    public class StudentController : ControllerBase
    {


        private readonly AppDbContext _context;
        // Contructor
        public StudentController(AppDbContext context)
        {

            // Initate Contructor
            _context = context;
        }

        // HTTP Get Method
        [HttpGet]
        public async Task<IEnumerable<Models.Student>> GetStudents()
        {
            var students = await _context.Students.AsNoTracking().ToListAsync();
            return students;
        }

        // HTTP Post Method - Create Student
        [HttpPost]
        public async Task<IActionResult> Create(Models.Student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _context.AddAsync(student);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return Ok();
            }
            return BadRequest();
        }

        // HTTPGet a single Student By ID
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Models.Student>>GetStudent(int id) 
        {
            var student = await _context.Students.FindAsync(id);

            if(student is null) 
            {
                return NotFound();
            }

            return Ok(student);
        }

        // Delete Single Student by ID
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id) 
        {
            var student = await _context.Students.FindAsync(id);
            
            if(student is null)
                return NotFound("Student Not Found");

            _context.Remove(student);

            var result = await _context.SaveChangesAsync();
            if(result > 0)
                return Ok("Student Deleted");

            return BadRequest("Unable to delete student");
        }


        // Edit Single Student by ID
        // api/students/1
        [HttpPut("{id:int}")]
        public async Task<IActionResult> EditStudent(int id, Student student)
        {
            var studentFromDb = await _context.Students.FindAsync(id);

            if (studentFromDb is null) 
            {
                return BadRequest("Student Not Found");
            }

            studentFromDb.Name = student.Name;
            studentFromDb.Address = student.Address;
            studentFromDb.Email = student.Email;
            studentFromDb.PhoneNumber = student.PhoneNumber;
            
            var result = await _context.SaveChangesAsync();
            
            if (result > 0)
            {
                return Ok("Student Successfully Updated");
            }

            return BadRequest("Unable to update Student Data");
        }
    }
}